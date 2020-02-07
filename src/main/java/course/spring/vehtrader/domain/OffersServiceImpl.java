package course.spring.vehtrader.domain;

import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.Offer;
import course.spring.vehtrader.repo.OffersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OffersServiceImpl implements OffersService {
    @Autowired
    OffersRepository repo;

    @Override
    public List<Offer> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Offer> findByUserId(String userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public Offer findById(String id) {
        return repo.findById(id).orElseThrow(() -> new NonExistingEntityException(
                String.format("Offer with id='%s' does not exist.", id)));
    }

    @Override
    public Offer create(Offer offer) {
        offer.setCreated_at(LocalDateTime.now());
        offer.setModified_at(LocalDateTime.now());
        return repo.insert(offer);
    }

    @Override
    public Offer update(Offer offer) {
        Optional<Offer> old = repo.findById(offer.getId());

        if (!old.isPresent()) {
            throw new InvalidEntityException(
                    String.format("Offer with ID=\"%s\" does not exist.", offer.getId()));
        }

        offer.setCreated_at(old.get().getCreated_at());
        offer.setModified_at(LocalDateTime.now());

        return repo.save(offer);
    }

    @Override
    public Offer delete(String id) {
        Optional<Offer> target = repo.findById(id);

        if (!target.isPresent()) {
            throw new NonExistingEntityException(
                    String.format("Offer with ID=\"%s\" does not exist.", id));
        }
        repo.deleteById(id);

        return target.get();
    }

    @Override
    public Long getCount() {
        return repo.count();
    }
}
