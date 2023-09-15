package d209.Idontcare.common.dto;

import d209.Idontcare.common.exception.CommonException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class ResponseDto<T> {
  @Schema(description = "각 상태에 맞는 code", example="200")
  private int code;
  @Schema(description = "200번대가 아닌 에러시 에러 메시지", example="에러시 에러메시지 출력")
  private String error;
  private T data;
  
  public static <D> ResponseDto success(D data){
    ResponseDto<D> result = new ResponseDto<D>();
    result.code = 200;
    result.data = data;
    
    return result;
  }

  public static ResponseDto<Void> fail(CommonException e){
    ResponseDto<Void> result = new ResponseDto<>();
    result.code = e.getCode();
    result.error = e.getMessage();
    
    return result;
  }
}
