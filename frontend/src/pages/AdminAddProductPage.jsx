import { useState } from "react";
import { addProduct, updateProduct, uploadImages } from "../services/adminService";

function AdminAddProductPage({ initialData, isEdit}) {
    const defaultState = {
        name: "",
        slug: "",
        description: "",
        featured: false,
        categoryId: "",
        price: "",
        variants: [],
  }
  const [formData, setFormData] = useState(initialData || defaultState);

  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});
  const [imageUploading, setImageUploading] = useState(false);


  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          color: "",
          sku: "",
          price: "",
          stock: "",
          lowStockThreshold: "",
          active: true,
          isDefault: prev.variants.length === 0,
          images: [],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
        const updated = [...prev.variants];
        updated[index][name] =
        type === "checkbox" ? checked : value;

        return { ...prev, variants: updated };
    });
  };

  // Image uploading
  const handleSelectImages = (variantIndex, files) => {
    const newFiles = Array.from(files);

    setSelectedImages((prev) => ({
        ...prev,
        [variantIndex]: [
        ...(prev[variantIndex] || []), 
        ...newFiles
        ],
    }));
    console.log("Selected images", selectedImages);
  };

  const removeSelectedImage = (variantIndex, imgIndex) => {
    setSelectedImages((prev) => {
        const updated = [...(prev[variantIndex] || [])];
        updated.splice(imgIndex, 1);

        return {
        ...prev,
        [variantIndex]: updated,
        };
    });
  };

  const removeExistingImage = (variantIndex, imgIndex) => {
    setFormData((prev) => {
        const updatedVariants = prev.variants.map((variant, vIdx) => {
            if (vIdx !== variantIndex) return variant;

            return {
                ...variant,
                images: variant.images.filter((_, i) => i !== imgIndex)
            };
        });

        return {
            ...prev,
            variants: updatedVariants
        };
    });
  };

  const handleUploadImages = async (variantIndex) => {
    const files = selectedImages[variantIndex];
    if (!files || files.length === 0) return;

    setImageUploading(true);

    try {
        const urls = await uploadImages(files);

        const images = urls.map((url, i) => ({
            imageUrl: url,
            isPrimary: i === 0,
            position: i + 1,
        }));

        setFormData((prev) => {
            const updated = [...prev.variants];
            updated[variantIndex].images = [
                ...updated[variantIndex].images,
                ...images,
            ];
            return { ...prev, variants: updated };
        });

        // clear selected images after upload
        setSelectedImages((prev) => ({
            ...prev,
            [variantIndex]: [],
        }));
        alert("Images uploaded successfully");

    } catch (err) {
        console.error(err);
    }
    finally{
        setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        variants: formData.variants.map((v) => ({
          ...v,
          price: Number(v.price),
          stock: Number(v.stock),
          lowStockThreshold: Number(v.lowStockThreshold),
          active: Boolean(v.active),
          isDefault: Boolean(v.isDefault)
        })),
      };

      console.log("Real Payload: ", payload);
      
      if(isEdit){
        await updateProduct(formData.id, payload);
        alert("Product updated Successfully");
      }else{
        await addProduct(payload);
        alert("Product added successfully!");
      }

      if(!isEdit) setFormData(defaultState);

    } catch {
      alert("Something wrong while adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* PRODUCT INFO */}
        <div className="bg-white shadow rounded-lg p-6 space-y-5">

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="label">Product Name</label>
              <input name="name" value={formData.name} onChange={handleProductChange} className="input" />
            </div>

            <div>
              <label className="label">Slug</label>
              <input name="slug" value={formData.slug} onChange={handleProductChange} className="input" />
            </div>

            <div>
              <label className="label">Base Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleProductChange} className="input" />
            </div>
          </div>

          <div>
            <label className="label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleProductChange} className="input" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="label">Category ID</label>
              <input name="categoryId" value={formData.categoryId} onChange={handleProductChange} className="input" />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleProductChange} />
                Featured Product
              </label>
            </div>
          </div>
        </div>

        {/* VARIANTS */}
        <div className="bg-white shadow rounded-lg p-6">

          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Variants</h3>
            <button type="button" onClick={addVariant} className="btn-primary">
              + Add Variant
            </button>
          </div>

          {formData.variants.map((variant, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">

              <div className="flex justify-between mb-3">
                <h4 className="font-medium">Variant {index + 1}</h4>
                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 text-sm">
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="label">Color</label>
                  <input name="color" value={variant.color} onChange={(e) => handleVariantChange(index, e)} className="input" />
                </div>

                <div>
                  <label className="label">SKU</label>
                  <input name="sku" value={variant.sku} onChange={(e) => handleVariantChange(index, e)} className="input" />
                </div>

                <div>
                  <label className="label">Price</label>
                  <input type="number" name="price" value={variant.price} onChange={(e) => handleVariantChange(index, e)} className="input" />
                </div>

                <div>
                  <label className="label">Stock</label>
                  <input type="number" name="stock" value={variant.stock} onChange={(e) => handleVariantChange(index, e)} className="input" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">

                <div>
                    <label className="label">Low Stock Threshold</label>
                    <input
                    type="number"
                    name="lowStockThreshold"
                    value={variant.lowStockThreshold || ""}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="input"
                    />
                </div>

                <div className="flex items-center gap-2 mt-6">
                    <input
                    type="checkbox"
                    name="active"
                    checked={variant.active}
                    onChange={(e) => handleVariantChange(index, e)}
                    />
                    <label>Active</label>
                </div>

                <div className="flex items-center gap-2 mt-6">
                    <input
                    type="checkbox"
                    name="isDefault"
                    checked={variant.isDefault}
                    onChange={(e) =>
                        handleVariantChange(index,e)}
                    />
                    <label>Default Variant</label>
                </div>

            </div>

              <div className="mt-4 space-y-2">
                {/* Select Files */}
                <input
                    type="file"
                    multiple
                    id={`file-${index}`}
                    className="hidden"
                    onChange={(e) =>
                        handleSelectImages(index, e.target.files)
                    }
                />

                <label
                    htmlFor={`file-${index}`}
                    className="btn-primary cursor-pointer inline-block"
                >
                    Select Images
                </label>

                {/* Upload Button */}
                {selectedImages[index]?.length > 0 && (
                    <button
                        type="button"
                        onClick={() => handleUploadImages(index)}
                        className="ml-3 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        {imageUploading ? "Uploading..." : "Upload Images"}
                    </button>
                )}

                {/* Selected Preview (Before Upload) */}
                <div className="flex gap-2 mt-2">
                    {selectedImages[index]?.map((file, i) => (
                        <div key={i} className="relative">
                            <img
                                key={i}
                                src={URL.createObjectURL(file)}
                                className="w-16 h-16 object-cover rounded border"
                            />

                            <button
                                type="button"
                                onClick={() => removeSelectedImage(index, i)}
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                </div>
                {/* Existing images in Edit mode */}
                <div className="flex gap-2 mt-3">
                    {variant.images?.map((img, i) => (
                        <div key={i} className="relative">
                        <img
                            src={img.imageUrl}
                            className="w-16 h-16 object-cover rounded border"
                        />

                        <button
                            type="button"
                            onClick={() => removeExistingImage(index, i)}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                        >
                            ✕
                        </button>
                        </div>
                    ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {!isEdit ? (
            <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
            </button>
        ) : (
            <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
            </button>
        )}
        
      </form>
    </div>
  );
}

export default AdminAddProductPage;