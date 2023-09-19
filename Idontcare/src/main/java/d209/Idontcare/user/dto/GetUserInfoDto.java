package d209.Idontcare.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetUserInfoDto {
  @Schema(description = "유저 ID", example = "1")
  private Long userId;
  
  @Schema(description = "로그인에 대한 메시지", example = "회원정보가 없습니다. 회원가입 페이지로 이동합니다. | 등록된 회원입니다.")
  private String msg;
  
  @Schema(description = "아이돈케어 회원가입 유무", example = "true | false")
  private boolean isJoined;
  
  @Schema(description = "닉네임", example = "신지훈 | null", nullable = true)
  private String nickname;
  
  @Schema(description = "이메일", example = "xx@xxx.com | null" , nullable = true)
  private String email;
  
  @Schema(description = "액세스 토큰", example = "회원가입이 되어있을 경우 토큰 발급 | null", nullable = true)
  private String refreshToken;
  
  @Schema(description = "리프레시 토큰", example = "회원가입이 되어있을 경우 토큰 발급 | null", nullable = true)
  private String accessToken;
}
