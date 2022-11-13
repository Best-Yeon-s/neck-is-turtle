package com.example.neckisturtle.feature.persistance;

import com.example.neckisturtle.feature.domain.Mission;
import com.example.neckisturtle.feature.domain.MissionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MissionRepo  extends JpaRepository<Mission, Integer> {
    Optional<Mission> findById(Integer Id);
}
