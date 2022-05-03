package org.unibl.etf.ds.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "content")
public class ContentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "billboard_id", nullable = false)
    private BillboardEntity billboard;

    @Column(name = "ad_name", nullable = false, length = 1024)
    private String adName;

    @Column(name = "deleted", nullable = false)
    private Boolean deleted;

    @Column(name = "approved", nullable = false)
    private Boolean approved;

    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @Column(name = "total_cost", nullable = false)
    private Double totalCost;
}