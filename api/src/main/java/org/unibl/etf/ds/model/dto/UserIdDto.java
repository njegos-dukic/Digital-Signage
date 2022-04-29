package org.unibl.etf.ds.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class UserIdDto {

    @NotNull(message = "Id cannot be null.")
    private Integer id;
}
