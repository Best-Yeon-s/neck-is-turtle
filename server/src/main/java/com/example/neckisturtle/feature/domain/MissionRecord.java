package com.example.neckisturtle.feature.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_mission_record")
@Entity

public class MissionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User userId;

    @ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "missionId", referencedColumnName = "mission_id")
    private Mission missionId;

    @Column(length = 1)
    private String completeYn;

    @Column
    private Date regDtm;

    @Column
    private Date completeDtm;

    public void setComplateYn(String Yn) {
        this.completeYn = Yn;
    }
}
