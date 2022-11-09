package com.example.neckisturtle.feature.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.neckisturtle.feature.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findById(Integer userId);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
