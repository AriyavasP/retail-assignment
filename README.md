
## Description

  

<h1>Not has unit-test and business validate</h1>
<h3>step play calculate discount.</h3>
<h4>1. get list product</h4>
curl --location 'http://localhost:3000/api/v1/item'
<h4>2. get list coupon</h4>
curl --location 'http://localhost:3000/api/v1/item'
<h4>3. Enter the information obtained to calculate the discount </h4>
<p>parameter coupon is optional</p>
<p>parameter memberPoint is optional</p>
curl --location 'http://localhost:3000/api/v1/purchase' \
--header 'Content-Type: application/json' \
--data '{
    "coupon": "ABCDFG",
    "memberPoint": 100,
    "cartList": [
        {
            "itemId": 1,
            "quantity": 2,
            "price": 250
        },
                {
            "itemId": 3,
            "quantity": 1,
            "price": 300
        }
    ]
}'
<h4>4. calculate discount for coupon -> on top -> seasonal</h4>
<p>ex: JSON result<p>
{
    "data": {
        "coupon": 300,
        "onTop": 30,
        "member": 100,
        "seasonal": 20,
        "lastedPrice": 350
    }
}
Can be added in the future.
Sure, I can rephrase your requirements in English:

1. Can the relationship between the `coupon` table and the `item` table be set to a one-to-many (1toM) relationship? This would allow you to exclude certain items from the coupon's eligibility, effectively removing the ability to use that coupon on specific items.

2. Additionally, you want to add a many-to-one (MtoN) relationship between the `itemType` table and the `item` table.

3. The `campaign` table will be used to restrict campaigns to specific categories. In other words, a campaign can be limited to apply only to certain categories of items.

In summary, you want to:

1. Set up a one-to-many relationship between the `coupon` and `item` tables to exclude certain items from coupon eligibility.
2. Create a many-to-one relationship between the `itemType` and `item` tables.
3. Use the `campaign` table to restrict campaigns to specific categories of items.

Let me know if this English rephrasing accurately captures your requirements. 

## Installation

  

```bash

$  npm  install

```

  

## Running the app

  

```bash

$  npm  run  start

```