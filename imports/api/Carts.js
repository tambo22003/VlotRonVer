import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Carts = new Mongo.Collection('Carts');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish Catalogs that are public or belong to the current user
  Meteor.publish('Carts', function CatalogsPublication() {
    return Carts.find({ owner: this.userId });
  });
}

Meteor.methods({
  'carts.addItem'(product , userId , amount) {
    amount = parseInt(amount);
    check(product, Object);
    check(userId, String);
    check(amount, Number);

    if (!this.userId) {
     throw new Meteor.Error('not-authorized');
    }
    // Make sure only one Cart is active
    let productId = product._id;
    let localCart = Carts.findOne({owner : userId});
    const number = amount;

    if (!localCart)
    {
      Carts.insert({
      createdAt: new Date(),
      owner: this.userId,
      })
    }

    console.log("-------------------opt------------------");
    tempCart = Carts.findOne(
      {
        $and :[
          {owner : userId},
          {items: {$exists : true}}
        ]
      }
    );

    let tempamount = Number;
    let itemFoundFlag = false;

    if(tempCart){
      tempCart.items.map((tempitem) => {
        console.log("Lopping!");
        if(tempitem.product._id == product._id ){
          tempamount = tempitem.amount ;
          console.log("FOUND! Target is Pulled");
          console.log(tempitem.product._id + "<-looped ~~~~~ Target->"+product._id);
          Carts.update(
            { owner : userId},
            { $pull :{ items: {product : product}}}
          );
          tempamount = tempamount+ amount ;
          Carts.update({owner : userId} , { $addToSet : {items : {product : product , amount : tempamount }}});
          itemFoundFlag = true ;
        }else{
          console.log("notFound!");
        }
      })
      console.log(itemFoundFlag);
      if(!itemFoundFlag){
        Carts.update({owner : userId} , { $addToSet : {items : {product : product , amount : amount}}});
      }
    }else{
      Carts.update({owner : userId} , { $addToSet : {items : {product : product , amount : amount}}});
    }
    itemFoundFlag = false ;
  },
  'carts.removeItem'(cartId, product) {
    check(cartId, String);
    check(product, Object);

    const cart = Carts.findOne(cartId);
    console.log("Server Debug Mesaage:---------> [Collection Element Deleted]");
    console.log(cart);
    if (cart.owner !== this.userId) {
      // If the catalog is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Carts.update({_id : cartId} , {$pull :{items: {product:product}}});
    let tempcart = Carts.findOne(
      {
        $and :[
          {_id : cartId},
          {items: {$eq : []}}
        ]
      }
    );
    if(tempcart){
      Carts.remove({_id : cartId});
    }

  },
  'carts.checkout'(userId) {
    check(userId, String);

    if (!this.userId) {
     throw new Meteor.Error('not-authorized');
    }

    const cart = Carts.findOne({owner: userId});
    if (cart.owner !== this.userId) {
      // If the catalog is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Meteor.call('pendingOrders.insert', userId, cart);
    Carts.remove({owner: userId});

  },
});
