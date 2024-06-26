

const Reindex =async(req,res)=>{
    const {indexName} = req.params;
    await createMapping()

}

module.exports = Reindex;