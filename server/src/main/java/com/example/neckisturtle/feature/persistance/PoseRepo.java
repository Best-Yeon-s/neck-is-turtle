package com.example.neckisturtle.feature.persistance;

import com.example.neckisturtle.feature.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.neckisturtle.feature.domain.Pose;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PoseRepo extends JpaRepository<Pose, Integer> {
    boolean existsByRegDtmAndUserId(Date regDtm, User userId);

    List<Pose> findByRegDtmBetweenAndUserIdOrderByRegDtm(Date start, Date end, User userId);


    Optional<Pose> findByRegDtmAndUserId(Date regDtm, User userId);
}
