import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";

export class GetItemList {
    @IsOptional()
    @IsNumberString()
    itemTypeId: number;
}

export class PurchaseItem {
    @IsOptional()
    @IsString()
    coupon: string;

    @IsOptional()
    @IsNumber()
    memberPoint: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartList)
    @ArrayNotEmpty()
    cartList: CartList[];
}

export class CartList {
    @IsNotEmpty()
    @IsNumber()
    itemId: number;
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    @IsNotEmpty()
    @IsNumber()
    price: number;
}