package org.unibl.etf.ds.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "log")
@Getter
@Setter
public class LogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "type", nullable = false, length = 64)
    private String type;

    @Column(name = "date_time", nullable = false)
    private Instant dateTime;

    @Column(name = "info", nullable = false, length = 1024)
    private String info;
}