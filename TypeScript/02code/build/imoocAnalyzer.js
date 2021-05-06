"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var ImoocAnalyzer = /** @class */ (function () {
    function ImoocAnalyzer() {
    }
    ImoocAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var coruseItems = $('.new-course:first').find('.show').find('.item');
        var courseInfos = [];
        coruseItems.map(function (index, element) {
            var title = $(element).find('.title').eq(0).text();
            var price = parseInt($(element).find('.price').eq(0).text().split('￥')[1]);
            courseInfos.push({ title: title, price: price });
        });
        return {
            time: (new Date()).getTime(),
            data: courseInfos
        };
    };
    ImoocAnalyzer.prototype.generateJsonContent = function (coruseResult, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[coruseResult.time] = coruseResult.data;
        return JSON.stringify(fileContent);
    };
    ImoocAnalyzer.prototype.analyzer = function (html, filePath) {
        var courseResult = this.getCourseInfo(html);
        var result = this.generateJsonContent(courseResult, filePath);
        return result;
    };
    return ImoocAnalyzer;
}());
exports.default = ImoocAnalyzer;
