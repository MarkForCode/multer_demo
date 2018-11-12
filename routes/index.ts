
import multer from "multer";
import { NextFunction, Request, Response, Router } from "express";

//const storage = multer.memoryStorage();//內存
const storage = multer.diskStorage({ //硬碟
  destination: function(req, file, cb){
    cb(null, '//Users/mark_huang/Pictures/marketing');//路徑
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now());//檔名
  }
});
let upload = multer({ storage:storage });

class indexRoutes{
  public router: Router;

  constructor(){
    this.router = Router();
  }
  public init(){
    this.router.post("/uploadImage", upload.single("image"), this.UploadImage);
    this.router.post("/uploadImages", upload.array("images", 12), this.UploadImages);
  }
  private UploadImage = async(req:Request, res:Response, next:NextFunction) =>{
    console.log(req.file.buffer);
    let body = req.body;
    console.log(body.comment);
    console.log(body.subject);
    return res.json(2222);
  }

  private UploadImages = async(req:Request, res:Response, next:NextFunction) =>{
    let files = req.files;
    console.log(files);
    let body = req.body;
    console.log(body);
    return res.json(2222);
  }
}


const indexRoute = new indexRoutes();
indexRoute.init();

export let indexRouter:Router = indexRoute.router;


