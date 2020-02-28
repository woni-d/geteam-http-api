import express from 'express';
import config from './../config';
import responseForm from './../lib/responseForm';
import models from './../models';

const router = express.Router();
export default router;

router.get('/study/:page', async (req, res, next) => {
  try {
    const { page } = req.params;

    const result = await models.Study.find({}).sort(req.params.listOrder || null).skip(Number(page) * 10)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    if (result.length) {
      res.json(responseForm(true, '', result));
    } else {
      res.status(204).json(responseForm(true));
    }
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.get('/study/:category/:page', async (req, res, next) => {
  try {
    const { category, page } = req.params;
    
    switch (category) {
      case 'develop': case 'design': case 'etc': break;
      default: throw new Error('유효한 카테고리가 아닙니다');
    }

    const result = await models.Study.find({ kind: category }).sort(req.params.listOrder || null).skip(Number(page) * 10)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    if (result.length) {
      res.json(responseForm(true, '', result));
    } else {
      res.status(204).json(responseForm(true));
    }
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.get('/study/:category/:id/view', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await models.Study.findById(id)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    await models.Study.findOneAndUpdate(id, { $inc: { hit: 1 } })
    .catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.post('/study/:category', async (req, res, next) => {
  try {
    const { category } = req.params;

    switch (category) {
      case 'develop': case 'design': case 'etc': break;
      default: throw new Error('유효한 카테고리가 아닙니다');
    }

    const { writeMem, writeKind, writeTopic, writeTitle, writeContent, writeWantNum, writeEndDay } = req.body;
    const result = await models.Study.create({
      kind: writeKind,
      account: writeMem,
      topic: writeTopic,
      title: writeTitle,
      content: writeContent,
      wantNum: writeWantNum,
      endDay: writeEndDay,
    }).then((result) => {
      return result._id;
    }).catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.patch('/study/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { modifyAuthor, modifyWantNum, modifyEndDay, modifyTopic, modifyTitle, modifyContent } = req.body;
    
    const updateObj = { 
      $set: 
      {
        topic: modifyTopic,
        title: modifyTitle,
        content: modifyContent,
        wantNum: modifyWantNum,
        endDay: modifyEndDay,
      }
    };
    
    const result = await models.Study.findByIdAndUpdate(id, updateObj, { new: true })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.delete('/study/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await models.Study.findByIdAndDelete(id)
    .then((result) => {
      return true;
    })
    .catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});


router.get('/contest/:page', async (req, res, next) => {
  try {
    const { page } = req.params;

    const result = await models.Contest.find({}).sort(req.params.listOrder || null).skip(Number(page) * 10)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    if (result.length) {
      res.json(responseForm(true, '', result));
    } else {
      res.status(204).json(responseForm(true));
    }
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.get('/contest/:category/:page', async (req, res, next) => {
  try {
    const { category, page } = req.params;
    
    switch (category) {
      case 'develop': case 'design': case 'idea': case 'etc': break;
      default: throw new Error('유효한 카테고리가 아닙니다');
    }

    const result = await models.Contest.find({ kind: category }).sort(req.params.listOrder || null).skip(Number(page) * 10)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    if (result.length) {
      res.json(responseForm(true, '', result));
    } else {
      res.status(204).json(responseForm(true));
    }
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.get('/contest/:category/:id/view', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await models.Contest.findById(id)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    await models.Contest.findOneAndUpdate(id, { $inc: { hit: 1 } })
    .catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.post('/contest/:category', async (req, res, next) => {
  try {
    const { category } = req.params;

    switch (category) {
      case 'develop': case 'design': case 'idea': case 'etc': break;
      default: throw new Error('유효한 카테고리가 아닙니다');
    }
    
    const { writeMem, writeKind, writeTopic, writePart, writePartNum, writeTitle, writeContent, writeWantNum, writeEndDay } = req.body;
    
    const partObj = {
      name: writePart.split(','),
      num: writePartNum,
    };
    
    const result = await models.Contest.create({
      kind: writeKind,
      account: writeMem,
      topic: writeTopic,
      part: partObj,
      title: writeTitle,
      content: writeContent,
      wantNum: writeWantNum,
      endDay: writeEndDay,
    }).then((result) => {
      return result._id;
    }).catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.patch('/contest/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { modifyAuthor, modifyWantNum, modifyEndDay, modifyTopic, modifyTitle, modifyContent } = req.body;
    
    const updateObj = { 
      $set: 
      {
        topic: modifyTopic,
        title: modifyTitle,
        content: modifyContent,
        wantNum: modifyWantNum,
        endDay: modifyEndDay,
      }
    };
    
    const result = await models.Contest.findByIdAndUpdate(id, updateObj, { new: true })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});

router.delete('/contest/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await models.Contest.findByIdAndDelete(id)
    .then((result) => {
      return true;
    })
    .catch((err) => {
      throw new err;
    });

    res.json(responseForm(true, '', result));
  } catch (err) {
    res.status(500).json(responseForm(false, err.toString()));
  }
});
