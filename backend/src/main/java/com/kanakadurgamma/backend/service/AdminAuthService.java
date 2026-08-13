package com.kanakadurgamma.backend.service;

import com.kanakadurgamma.backend.entity.Admin;
import com.kanakadurgamma.backend.repository.AdminRepository;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class AdminAuthService {

    private static final String ALGORITHM = "PBKDF2WithHmacSHA256";
    private static final int ITERATIONS = 120_000;
    private static final int KEY_LENGTH = 256;
    private static final int SALT_LENGTH = 16;

    private final AdminRepository repository;
    private final SecureRandom secureRandom = new SecureRandom();

    public AdminAuthService(AdminRepository repository) {
        this.repository = repository;
    }

    public boolean authenticate(
            String username,
            String password) {

        if (username == null || password == null) {
            return false;
        }

        return repository.findByUsername(username.trim())
                .filter(Admin::isActive)
                .map(admin ->
                        verifyPassword(
                                password,
                                admin.getPasswordHash()
                        )
                )
                .orElse(false);
    }

    public String hashPassword(String password) {

        try {

            byte[] salt = new byte[SALT_LENGTH];
            secureRandom.nextBytes(salt);

            PBEKeySpec spec = new PBEKeySpec(
                    password.toCharArray(),
                    salt,
                    ITERATIONS,
                    KEY_LENGTH
            );

            SecretKeyFactory factory =
                    SecretKeyFactory.getInstance(ALGORITHM);

            byte[] hash =
                    factory.generateSecret(spec)
                            .getEncoded();

            spec.clearPassword();

            return "pbkdf2$"
                    + ITERATIONS
                    + "$"
                    + Base64.getEncoder().encodeToString(salt)
                    + "$"
                    + Base64.getEncoder().encodeToString(hash);

        } catch (Exception e) {

            throw new IllegalStateException(
                    "Failed to hash admin password",
                    e
            );
        }
    }

    private boolean verifyPassword(
            String password,
            String storedHash) {

        try {

            String[] parts =
                    storedHash.split("\\$");

            if (parts.length != 4) {
                return false;
            }

            int iterations =
                    Integer.parseInt(parts[1]);

            byte[] salt =
                    Base64.getDecoder()
                            .decode(parts[2]);

            byte[] expectedHash =
                    Base64.getDecoder()
                            .decode(parts[3]);

            PBEKeySpec spec = new PBEKeySpec(
                    password.toCharArray(),
                    salt,
                    iterations,
                    expectedHash.length * 8
            );

            SecretKeyFactory factory =
                    SecretKeyFactory.getInstance(ALGORITHM);

            byte[] actualHash =
                    factory.generateSecret(spec)
                            .getEncoded();

            spec.clearPassword();

            return MessageDigest.isEqual(
                    expectedHash,
                    actualHash
            );

        } catch (Exception e) {

            return false;
        }
    }
}