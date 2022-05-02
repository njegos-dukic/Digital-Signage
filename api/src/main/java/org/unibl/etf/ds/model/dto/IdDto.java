package org.unibl.etf.ds.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IdDto {

    @NotNull(message = "Id cannot be null.")
    private Integer id;
}
