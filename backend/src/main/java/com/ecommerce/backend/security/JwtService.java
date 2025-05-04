package com.ecommerce.backend.security;

import com.ecommerce.backend.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "c2VjdXJlLXNwcmluZy1iYXNlNjQtc2VjcmV0LWtleS0xMjM0NTY3ODkwMTIzNDU2Nzg5";
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 saat

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail()) // burada kullanıcıyı tanımlayan bilgi
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
