import ProviderObjectLiteral from "../DataStructures/Provider";

class Provider {
    private readonly id_: number;
    private readonly name_: string;

    public static fromObjectLiteral(data: ProviderObjectLiteral): Provider {
        return new this(data);
    }

    public get id(): number {
        return this.id_;
    }

    public get name(): string {
        return this.name_;
    }

    private constructor(data: ProviderObjectLiteral) {
        if (data.id <=0) {
            throw new Error('Id must be greater than 0');
        }

        if (!data.name) {
            throw new Error('Name can not be empty');
        }

        this.id_ = data.id;
        this.name_ = data.name;
    }
}

export default Provider;
