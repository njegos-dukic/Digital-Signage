package org.unibl.etf.ds.model.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AdminUserDto {

    @NotNull
    private Integer id;
    @NotNull
    private String username;
    @NotNull
    private String email;
    @NotNull
    private Boolean deleted;
}