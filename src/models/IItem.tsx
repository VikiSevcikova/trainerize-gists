export interface ItemType {
    id: string,
    owner: string,
    image: string,
    names: string[]
}

export interface ItemProps {
    item: ItemType
}