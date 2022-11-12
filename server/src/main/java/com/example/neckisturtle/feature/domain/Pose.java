package com.example.neckisturtle.feature.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_straight_record")
@Entity

public class Pose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User userId;

    @Column
    private Integer straightTime;

    @Column
    private Integer turtleTime;

    @Column
    private Date regDtm;

    public void setPoseTime(Integer straightTime, Integer turtleTime){
        this.straightTime = straightTime;
        this.turtleTime = turtleTime;
    }
}
