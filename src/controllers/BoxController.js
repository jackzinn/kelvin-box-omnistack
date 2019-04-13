const Box = require('../models/Box');

class BoxController {
    async store(req, res){
        // const box = await Box.create({title:  req.body.title});
        // ou pode fazer assim tbm
        const box = await Box.create(req.body);

        return res.json(box);
    }
    // METODO GET DE BOX
    async show(req, res){
        // METODO SIMPLES DE TRAZER DADOS
        // const box = await Box.findById(req.params.id).populate('files');

        // METODO MAIS AVANÇADO PODENDO CUSTOMIZAR
        const box = await Box.findById(req.params.id).populate({
            path:'files',
            options:{ sort: {   createdAt: -1   }}
        });
        // da seguinte forma escrito eu estou ordenando que o mais antigo fique em primeiro lugar

        return res.json(box);
    }
}

module.exports = new BoxController();
