package org.unibl.etf.ds.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileDto {

    private String filename;
    private byte[] content;
}
