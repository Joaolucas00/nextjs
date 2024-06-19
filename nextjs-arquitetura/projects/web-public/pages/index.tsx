import { sum } from "@alura/utils/math/sum"
import { Text } from "@alura/design-system/components/Text"

export default function Home() {
    return (
        <main>
            <h1>Home</h1>
            <Text tag="p">Importando modulo local: @alura/utils/math/sum sum(2, 2): { sum(2, 2) } </Text>
            <Text tag="h1">
              design-system
            </Text>
        </main>
    )
}
