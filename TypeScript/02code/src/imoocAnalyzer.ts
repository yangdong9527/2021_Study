import fs from 'fs'
import cheerio from 'cheerio'
import {Analyzer} from './crowller'

interface Course {
  title: string,
  price: number
}

interface courseResult {
  time: number,
  data: Course[]
}
interface Content {
  [propsName: number]: Course[]
}

export default class ImoocAnalyzer implements Analyzer {
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const coruseItems = $('.new-course:first').find('.show').find('.item')
    const courseInfos: Course[] = []
    coruseItems.map((index, element) => {
      const title = $(element).find('.title').eq(0).text()
      const price = parseInt($(element).find('.price').eq(0).text().split('￥')[1])
      courseInfos.push({title, price})
    })
    return {
      time: (new Date()).getTime(),
      data: courseInfos
    }
  }
  private generateJsonContent(coruseResult: courseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[coruseResult.time] = coruseResult.data
    return JSON.stringify(fileContent)
  }

  analyzer(html: string, filePath: string) {
    const courseResult = this.getCourseInfo(html)
    const result = this.generateJsonContent(courseResult, filePath)
    return result
  }
}