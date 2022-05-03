package org.unibl.etf.ds.model.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class NewContentDto {

    @NotNull(message = "User cannot be null.")
    private Integer userId;

    @NotNull(message = "Billboard cannot be null.")
    private Integer billboardId;

    @NotNull(message = "Name date cannot be null.")
    private String adName;

    @NotNull(message = "Start date cannot be null.")
    private String startDate;

    @NotNull(message = "End date cannot be null.")
    private String endDate;

    @NotNull(message = "Content cannot be null.")
    private MultipartFile content;
}
