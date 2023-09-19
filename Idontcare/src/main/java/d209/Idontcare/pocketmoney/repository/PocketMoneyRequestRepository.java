package d209.Idontcare.pocketmoney.repository;

import d209.Idontcare.TUser;
import d209.Idontcare.pocketmoney.entity.PocketMoneyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Tuple;
import java.util.List;

public interface PocketMoneyRequestRepository extends JpaRepository<PocketMoneyRequest, Long> {
  
  @Query("select p.pocketMoneyRequestId as pocketMoneyRequestId, p.parent.userId as parentId, p.parent.name as parentName, p.child.userId as childId, p.child.name as childName, " +
      "p.type as type, p.amount as amount, p.createdAt as createdAt, p.cancelDate as cancelDate" +
      " from PocketMoneyRequest p where p.parent = :parent")
  List<Tuple> findAllByParent(TUser parent);
}