package com.balajihandlooms.sample.security;

import com.balajihandlooms.sample.entity.User;
import com.balajihandlooms.sample.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final String SECRET = "mySuperSecretKeyForJwtThatIsLongEnough12345";
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);

            try{
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SECRET)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                String email =  claims.getSubject();
                Long userId = claims.get("userId", Long.class);
                String role = claims.get("role", String.class);

                System.out.println("Role from JWT: "+ role);

                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);

                List<GrantedAuthority> authorities = List.of(authority);

                if(SecurityContextHolder.getContext().getAuthentication() == null){
                    User user = userRepository.findByEmail(email).orElse(null);
                    if(user != null){
                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(
                                        user,
                                        null,
                                        authorities
                                );
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            }
            catch (Exception e){
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }
}
