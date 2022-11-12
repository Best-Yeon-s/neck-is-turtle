package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.feature.domain.Pose;
import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.dto.*;
import com.example.neckisturtle.feature.persistance.PoseRepo;
import com.example.neckisturtle.feature.persistance.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PoseService {

    @Autowired
    private final PoseRepo poseRepo;

    @Autowired
    private final UserRepo userRepo;

    public PoseService(PoseRepo poseRepo, UserRepo userRepo) {
        this.poseRepo = poseRepo;
        this.userRepo = userRepo;
    }

    public TodayPoseDto getTodayPose(String email){
        try{
            Date today = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String format = formatter.format(today);

            User user = userRepo.findByEmail(email).orElseThrow();

            Pose pose = poseRepo.findByRegDtmAndUserId(
                    new SimpleDateFormat("yyyy-MM-dd").parse(format), user).orElseThrow();

            TodayPoseDto resultDto = TodayPoseDto.builder()
                    .straightTime(pose.getStraightTime())
                    .turtleTime(pose.getTurtleTime())
                    .build();
            return resultDto;

        }catch (Exception e){

        }
        return TodayPoseDto.builder().build();
    }

    public TodayPoseDto addTodayPose(TodayPoseDto dto, String email){
        try{
            Date today = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String format = formatter.format(today);

            User user = userRepo.findByEmail(email).orElseThrow();

            if (poseRepo.existsByRegDtmAndUserId(new SimpleDateFormat("yyyy-MM-dd").parse(format), user)){
                Pose pose = poseRepo.findByRegDtmAndUserId(
                        new SimpleDateFormat("yyyy-MM-dd").parse(format), user).orElseThrow();
                pose.setPoseTime(
                        pose.getStraightTime() + dto.getStraightTime(),
                        pose.getTurtleTime() + dto.getTurtleTime());
                poseRepo.save(pose);
                TodayPoseDto resultDto = TodayPoseDto.builder()
                        .straightTime(pose.getStraightTime())
                        .turtleTime(pose.getTurtleTime())
                        .build();
                return resultDto;
            }else{
                Pose pose = Pose.builder()
                        .straightTime(dto.getStraightTime())
                        .turtleTime(dto.getTurtleTime())
                        .regDtm(new SimpleDateFormat("yyyy-MM-dd").parse(format))
                        .userId(user)
                        .build();
                poseRepo.save(pose);
                TodayPoseDto resultDto = TodayPoseDto.builder()
                        .straightTime(pose.getStraightTime())
                        .turtleTime(pose.getTurtleTime())
                        .build();
                return resultDto;
            }

            //exist로 해당 날짜의 해당 유저에 대한 데이터가 있는지 확인하기
            //만약 없다면 새로 추가하고, straight와 turtle을 받은 데이터로 세팅하기
            //만약 있다면 이미 있는 데이터에 straight와 turtlr을 증가시키기
        } catch (Exception e) {

        }

        return TodayPoseDto.builder().build();
    }

    public TodayPoseDto modifyTodayStraightPose(PutStraightTimeDto dto, String email){
        try{
            Date today = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String format = formatter.format(today);

            User user = userRepo.findByEmail(email).orElseThrow();
            Pose pose = poseRepo.findByRegDtmAndUserId(
                    new SimpleDateFormat("yyyy-MM-dd").parse(format), user).orElseThrow();

            pose.setPoseTime(dto.getStraightTime(), pose.getTurtleTime());
            poseRepo.save(pose);

            TodayPoseDto resultDto = TodayPoseDto.builder()
                    .straightTime(pose.getStraightTime())
                    .turtleTime(pose.getTurtleTime())
                    .build();

            return resultDto;

        }catch(Exception e){

        }
        return TodayPoseDto.builder().build();
    }

    public TodayPoseDto modifyTodayTurtlePose(PutTurtleTimeDto dto, String email){
        try{
            Date today = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String format = formatter.format(today);

            User user = userRepo.findByEmail(email).orElseThrow();
            Pose pose = poseRepo.findByRegDtmAndUserId(
                    new SimpleDateFormat("yyyy-MM-dd").parse(format), user).orElseThrow();

            pose.setPoseTime(pose.getStraightTime(), dto.getTurtleTime());
            poseRepo.save(pose);

            TodayPoseDto resultDto = TodayPoseDto.builder()
                    .straightTime(pose.getStraightTime())
                    .turtleTime(pose.getTurtleTime())
                    .build();

            return resultDto;

        }catch(Exception e){

        }
        return TodayPoseDto.builder().build();
    }

    public List<WeekPoseDto> getWeekPose(String email){
        try{
            Date today = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String format = formatter.format(today);

            Calendar cal = Calendar.getInstance();
            Date todayCal = new SimpleDateFormat("yyyy-MM-dd").parse(format);
            cal.setTime(todayCal);

            cal.add(Calendar.DATE, 1);
            String endDay = formatter.format(cal.getTime());
            cal.add(Calendar.DATE, -7);
            String startDay = formatter.format(cal.getTime());


            User user = userRepo.findByEmail(email).orElseThrow();

            List<Pose> poses = poseRepo.findByRegDtmBetweenAndUserIdOrderByRegDtm(
                    new SimpleDateFormat("yyyy-MM-dd").parse(startDay),
                    new SimpleDateFormat("yyyy-MM-dd").parse(endDay),
                    user);

            List<WeekPoseDto> collect = poses.stream()
                    .map(m-> new WeekPoseDto(m.getRegDtm(), m.getStraightTime(), m.getTurtleTime()))
                    .collect(Collectors.toList());

            return collect;

        }catch(Exception e){

        }
        return null;
    }
}
