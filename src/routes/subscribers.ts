import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import {
  Subscriber,
  SubscriberDoc,
  SubscriberProps,
} from '../models/subscriber';

/* Get All */
router.get('/', async (req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Getting One */
router.get('/:id', getSubscriber, (req: Request, res: Response) => {
  res.json(res.subscriber);
});

/* Creating One */
router.post('/', async (req: Request, res: Response) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber); // 201 = successfully created an object
  } catch (error) {
    // 400 = user input fail
    res.status(400).json({ error: error.message });
  }
});

/* Updating One */
router.patch('/:id', getSubscriber, async (req: Request, res: Response) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  console.log(res.subscriber);
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* Deleting One */
router.delete('/:id', getSubscriber, async (req: Request, res: Response) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Deleted subscriber' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Middle ware */

declare global {
  namespace Express {
    export interface Response {
      subscriber: SubscriberDoc;
    }
  }
}

async function getSubscriber(req: Request, res: Response, next: NextFunction) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  next();
}

export default router;
