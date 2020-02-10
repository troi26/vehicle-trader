package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.BidsService;
import course.spring.vehtrader.domain.OffersService;
import course.spring.vehtrader.domain.UsersService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.Bid;
import course.spring.vehtrader.model.Offer;
import course.spring.vehtrader.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

import javax.validation.Valid;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

@CrossOrigin
@RestController
@RequestMapping("/api/offers")
public class OffersController {
    @Autowired
    private OffersService offerService;

    @Autowired
    private BidsService bidsService;

    @Autowired
    private UsersService usersService;

    @CrossOrigin
    @GetMapping
    public List<Offer> getAllOffers() {
        return offerService.findAll();
    }

    @CrossOrigin
    @GetMapping(params = "userId")
    public List<Offer> getOfferByUserId(@RequestParam("userId") String userId) {
        return offerService.findByUserId(userId);
    }

    @CrossOrigin
    @GetMapping(params = "id")
    public Offer getOfferBydId(@RequestParam("id") String id) {
        return offerService.findById(id);
    }

    @CrossOrigin
    @PostMapping
    public Offer insertOffer(@Valid @RequestBody Offer offer){
        return offerService.create(offer);
    }

    @CrossOrigin
    @PutMapping(params = "id")
    public Offer updateOffer(@RequestParam("id") String id, @RequestBody Offer offer) {
        if(!id.equals(offer.getId())) {
            throw new InvalidEntityException(
                    String.format("Offer ID='%s' is different from URL resource ID='%s'", offer.getId(), id));
        }
        return offerService.update(offer);
    }
//
//    @CrossOrigin
//    @PutMapping(path = "/close", params = "id")
//    public Object closeOffer(@RequestParam("id") String id, @RequestBody Offer offer) {
//        Bid winningBid = bidsService.findOfferWinningBid(offer.getId());
//        if (winningBid != null) {
//            User winner = usersService.findById(winningBid.getUserId());
//            winner.setCashAmount(winner.getCashAmount() - winningBid.getValue());
//            offer.setActiveStatus(false);
//            offer.setWinnerId(winner.getId());
//            usersService.update(winner);
//        } else {
//            return new ResponseEntity<String>("Can not be close. There is already a bid made", HttpStatus.CONFLICT);
//        }
//        ResponseEntity<Offer> response = new ResponseEntity<>(offer, HttpStatus.OK);
//        return response;
//    }

    @CrossOrigin
    @PutMapping(path = "/finalize")
    public Offer finalizeOffer(@RequestBody Offer offer) {
        Bid winningBid = bidsService.findOfferWinningBid(offer.getId());
        if (winningBid != null) {
            User winner = usersService.findById(winningBid.getUserId());
            winner.setCashAmount(winner.getCashAmount() - winningBid.getValue());
            offer.setActiveStatus(false);
            offer.setWinnerId(winner.getId());
            usersService.update(winner);
        } else {
            offer.setActiveStatus(false);
        }
//        ResponseEntity<Offer> response = new ResponseEntity<>(offer, HttpStatus.OK);
        return offerService.update(offer);
    }

    @CrossOrigin
    @DeleteMapping(params = "id")
    public Offer deleteOffer(@RequestParam("id") String id){
        return offerService.delete(id);
    }

    @RequestMapping(value = "/uploadPhoto", method = RequestMethod.POST)
    public ResponseEntity<String> submit(@RequestParam("files") MultipartFile[] files, ModelMap modelMap) {
        modelMap.addAttribute("files", files);

        if (!files[0].isEmpty() && files[0].getOriginalFilename().length() > 0) {
            String fileName = files[0].getOriginalFilename().replaceFirst(".png", "");
            Offer offer = offerService.findById(fileName);

            if (offer.getPhotoUrl() != null && fileName.equals(offer.getPhotoUrl().replaceFirst(".png", ""))) {
                fileName += "_1.png";
            } else {
                fileName += ".png";
            }

            if (Pattern.matches(".+\\.(jpg|png|jpeg)", files[0].getOriginalFilename())) {

                handleMultipartFile(files[0], fileName);
            } else {
                return new ResponseEntity<>(String.format("{ \"photoUrl\": \"NO_IMAGE.png\" }"),
                        HttpStatus.CONFLICT);
            }

            return new ResponseEntity<String>(String.format("{ \"photoUrl\":  \"%s\" }", fileName),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(String.format("{ \"photoUrl\": \"NO_IMAGE.png\" }"),
                HttpStatus.CONFLICT);
    }

    private void handleMultipartFile (MultipartFile file, String filename) {
//        String name = file.getOriginalFilename();
        long size = file.getSize();

        String path = filename;
        try {
            File currentDir = new File("uploads");
            if(!currentDir.exists()) {
                currentDir.mkdirs();
            }

            path = currentDir.getAbsolutePath() + "/" + filename;
            path = new File(path).getAbsolutePath();
//            log.info(path);
            File f = new File(path);
            FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(f));
        } catch (IOException ex) {
            System.out.printf("ERROR copying file!!! %s [%d]", path, file.getSize());
        }
    }
}
