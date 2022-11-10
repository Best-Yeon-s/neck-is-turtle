package com.example.neckisturtle.feature.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_mission")
@Entity

public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mission_id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Date reg_dtm;
}
