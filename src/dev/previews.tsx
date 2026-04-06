import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {ExampleLoaderComponent, PaletteTree} from "./palette";
import {ItemCard} from "../components/ItemCard.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ItemCard">
                <ItemCard title={"TEST"} description={"TEST 2"} price={12} onAddToCart={function(): void {
                    throw new Error("Function not implemented.");
                } } isAvailable={false}/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/PaletteTree">
                <PaletteTree/>
            </ComponentPreview>
            <ComponentPreview path="/ExampleLoaderComponent">
                <ExampleLoaderComponent/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;