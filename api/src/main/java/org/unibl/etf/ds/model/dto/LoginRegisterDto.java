package org.unibl.etf.ds.model.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LoginRegisterDto {

    private String username;
    private String password;
}
