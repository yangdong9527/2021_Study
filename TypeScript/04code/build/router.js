"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var imoocAnalyzer_1 = __importDefault(require("./imoocAnalyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('hello word');
});
router.post('/getData', function (req, res) {
    var url = 'https://www.imooc.com';
    var analyzer = imoocAnalyzer_1.default.getInstance();
    var crowller = new crowller_1.default(analyzer, url);
    res.send('getData Success!');
});
exports.default = router;
