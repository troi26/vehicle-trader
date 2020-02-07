package course.spring.vehtrader.domain;

import course.spring.vehtrader.model.Offer;

import java.util.List;

public interface OffersService {
    List<Offer> findAll();
    List<Offer> findByUserId(String userId);
    Offer findById(String id);
    Offer create(Offer offer);
    Offer update(Offer offer);
    Offer delete(String id);
    Long getCount();
}
