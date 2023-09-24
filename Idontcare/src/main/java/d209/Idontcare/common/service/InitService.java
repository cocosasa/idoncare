package d209.Idontcare.common.service;

import d209.Idontcare.account.entity.RealAccount;
import d209.Idontcare.account.entity.TransactionHistory;
import d209.Idontcare.account.entity.Type;
import d209.Idontcare.account.entity.VirtualAccount;
import d209.Idontcare.account.repository.RealAccountRepository;
import d209.Idontcare.account.repository.TransactionHistoryRepository;
import d209.Idontcare.account.repository.VirtualAccountRepository;
import d209.Idontcare.account.service.EncryptService;
import d209.Idontcare.user.entity.Role;
import d209.Idontcare.user.entity.User;
import d209.Idontcare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class InitService {
  
  private final UserRepository userRepository;
  private final VirtualAccountRepository virtualAccountRepository;
  private final TransactionHistoryRepository transactionHistoryRepository;
  private final RealAccountRepository realAccountRepository;
  
  private final EncryptService encryptService;
  
  @PostConstruct
  public void init(){
    userDataInit();
    virtualAccountDataInit();
    transactionHistoryDataInit();
    realAccountDataInit();
    
  }
  
  private void userDataInit(){
    if(userRepository.existsById(1L)) return;
    userRepository.save(new User(1L, 1111L, "01011111111", "김출금", Role.PARENT, "김출금닉네임"));
    userRepository.save(new User(2L, 2222L, "01022222222", "김입금", Role.CHILD, "김입금닉네임"));
  }
  
  private void virtualAccountDataInit(){
    if(virtualAccountRepository.existsById(111111111111L)) return;
    
    
    virtualAccountRepository.save(new VirtualAccount(111111111111L, userRepository.getReferenceById(1L), 1_000_000L, "1234"));
    virtualAccountRepository.save(new VirtualAccount(222222222222L, userRepository.getReferenceById(2L), 1000L, "1234"));
  }
  
  private void transactionHistoryDataInit(){
    if(transactionHistoryRepository.count() > 0 ) return;
    
    User user1 = userRepository.getReferenceById(1L);
    transactionHistoryRepository.save(new TransactionHistory(user1, "스타벅스 결제1", 10_000L, Type.DEPOSITORY, 100_000L));
    transactionHistoryRepository.save(new TransactionHistory(user1, "스타벅스 결제2", 10_000L, Type.WITHDRAWAL, 100_000L));
  }
  
  private void realAccountDataInit(){
    if(realAccountRepository.count() > 0) return;
    
    User user1 = userRepository.getReferenceById(1L);
    
    realAccountRepository.save(new RealAccount(encryptService.encrypt("1234"), user1, encryptService.encrypt("1234"),
        "신한은행", "41"));
  }
}
