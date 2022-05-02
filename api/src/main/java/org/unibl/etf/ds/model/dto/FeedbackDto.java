package org.unibl.etf.ds.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {

    private Integer id;
    private String content;
    private AdminUserDto user;
}
