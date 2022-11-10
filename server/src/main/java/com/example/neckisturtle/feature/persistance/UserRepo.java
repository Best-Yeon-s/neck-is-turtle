package com.example.neckisturtle.feature.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.neckisturtle.feature.domain.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer>{
    Optional<User> findById(Integer userId);

    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
