var express = require('express')
var Canvas = require('canvas')
var fs = require('fs')
var path = require('path')
var wordcloud2 = require('./wordcloud2-server')
Canvas.registerFont(process.cwd() +'/src/font1.ttf', {family: 'DFPWaWa-B5'});
var canvas = new Canvas(300, 300);

const app = express()

app.get('/:type/:name/:text', (req, res) => {
    var type = req.params.type;
    var name = req.params.name;
    var text = req.params.text;

        res.writeHead(200, { 'Content-Type': 'image/png' })
    //return new Promise((resolve, reject) => {
        wordcloud2(canvas, {
                  list: [
                      ['勇往直前的航海手', 36],
                      ['聪明无敌', 20],
                      ['个人主义色彩', 20],
                      ['注重隐私', 20],
                      ['好奇宝宝', 20],
                      ['崇尚自由', 20],
                      ['热情率直', 20],
                      ['柏拉图', 20],
                      ['不将就', 16],
                      ['热爱探索的性伴侣', 16],
                      ['独立思考', 16],
                      ['以道理服人', 16],
                      ['不随波逐流', 16],
                      ['IQ高', 16],
                      ['拒绝传统束缚', 16],
                      ['原则处事', 16],
                      ['不重物质', 16],
                      ['不多疑', 16],
                      ['有味道的凉白开', 16]
                  ],
                  backgroundColor: '#000',
                  gridSize: 18,
                  weightFactor: 1,
                  fontFamily: '"DFPWaWa-B5"',
                  color: function (word, weight) {
                    return (weight === 12) ? '#f02222' : '#c09292';
                  },
                  shape: "square",
                  rotateRatio: 0,
                  done: function() {
                      canvas.createPNGStream().pipe(res)
                      //console.log('<img src="' + canvas.toDataURL() + '" />');
                      //resolve(app);
                  }
              })
          //});
  res.on('end', () => {
    res.sendFile(path.join(__dirname, 'image-src.png'));
  });
})

app.listen(9008, () => {
  console.log(`server started at localhost:9008`)
})
