package org.unibl.etf.ds.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "billboard")
public class BillboardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @Column(name = "city", nullable = false, length = 256)
    private String city;

    @Column(name = "daily_rate", nullable = false)
    private Double dailyRate;

    @Column(name = "available", nullable = false)
    private Boolean available = true;

    @Column(name = "deleted", nullable = false)
    private Boolean deleted = false;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;
}