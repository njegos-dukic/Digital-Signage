package org.unibl.etf.ds.model.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class BillboardDto {

    private Integer id;
    @NotNull(message = "Name cannot be null.")
    private String name;
    @NotNull(message = "City cannot be null.")
    private String city;
    @NotNull(message = "Daily rate cannot be null.")
    private Double dailyRate;
    @NotNull(message = "Available cannot be null.")
    private Boolean available;
    private Double lat;
    private Double lng;
}
