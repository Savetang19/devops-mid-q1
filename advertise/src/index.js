const express = require("express");

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the database host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

if (!process.env.RABBIT) {
    throw new Error("Please specify the name of the RabbitMQ host using environment variable RABBIT");
}

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const RABBIT = process.env.RABBIT;

//
// Application entry point.
//
async function main() {

    const app = express();

    //
    // Enables JSON body parsing for HTTP requests.
    //
    app.use(express.json()); 

    //
    // HTTP GET route to retrieve ads list.
    //
    app.get("/advertise", async (req, res) => {
        //
        // Retreives viewing history from database.
        // In a real application this should be paginated.
        //
        
        const ads = [
            {
                    photo: "ads/iphone.png",
                    name: "iPhone",
                    url: "https://shopee.co.th/Apple-iPhone-13-%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD-6.1-%E0%B8%99%E0%B8%B4%E0%B9%89%E0%B8%A7-iStudio-by-SPVi-i.287137993.10951724608?sp_atk=0d8bc175-52b4-4e0f-ab3b-c06562e13d5b&xptdk=0d8bc175-52b4-4e0f-ab3b-c06562e13d5b"
                },
                {
                    photo: "ads/shoes.png",
                    name: "Shoes",
                    url: "https://www.lazada.co.th/products/new-balance-nb-nd-ux-530-mr530sgb-metallic-4990-i5529502506-s23507998714.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253Anew%252Bbalance%253Bnid%253A5529502506%253Bsrc%253ALazadaMainSrp%253Brn%253A5a9fd496dd54ebb47db7379b3afe9e83%253Bregion%253Ath%253Bsku%253A5529502506_TH%253Bprice%253A4990%253Bclient%253Adesktop%253Bsupplier_id%253A100114718%253Bbiz_source%253Ah5_hp%253Bslot%253A13%253Butlog_bucket_id%253A470687%253Basc_category_id%253A6657%253Bitem_id%253A5529502506%253Bsku_id%253A23507998714%253Bshop_id%253A145497%253BtemplateInfo%253A107882_A3_C_D_E%25231104_L%2523&freeshipping=0&fs_ab=2&fuse_fs=&lang=en&location=Bangkok&price=4.99E%203&priceCompare=skuId%3A23507998714%3Bsource%3Alazada-search-voucher%3Bsn%3A5a9fd496dd54ebb47db7379b3afe9e83%3BoriginPrice%3A499000%3BdisplayPrice%3A499000%3BsinglePromotionId%3A-1%3BsingleToolCode%3A-1%3BvoucherPricePlugin%3A0%3Btimestamp%3A1740539271199&ratingscore=&request_id=5a9fd496dd54ebb47db7379b3afe9e83&review=&sale=2&search=1&source=search&spm=a2o4m.searchlist.list.13&stock=1"
                },
                {
                    photo: "ads/mop.png",
                    name: "Mop",
                    url: "https://shopee.co.th/Spin-Mop-%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%96%E0%B8%B9%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99-%E0%B8%96%E0%B8%B1%E0%B8%87%E0%B8%9B%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%81%E0%B8%95%E0%B8%99%E0%B9%80%E0%B8%A5%E0%B8%AA-%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B9%87%E0%B8%AD%E0%B8%9A-2-%E0%B8%9C%E0%B8%B7%E0%B8%99-(-%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%A1%E0%B9%8A%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B9%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99-%E0%B8%96%E0%B8%B1%E0%B8%87%E0%B8%96%E0%B8%B9%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99-%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%96%E0%B8%B9-)-HHsociety-i.772461.1878246941?sp_atk=2e1bd23f-0058-48ac-83fa-62f105ee0333&xptdk=2e1bd23f-0058-48ac-83fa-62f105ee0333"
                }
        ]
        res.json({ ads });
    });

    //
    // Starts the HTTP server.
    //
    app.listen(PORT, () => {
        console.log("Microservice online.");
    });
}

main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });