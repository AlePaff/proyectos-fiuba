import { Image, Flex, Text } from '@chakra-ui/react'
import { Stack, Heading, Card, Tooltip, CardBody } from '@chakra-ui/react'
import { WarningTwoIcon } from '@chakra-ui/icons'
import ReactGA from "react-ga4";
import { useState, useEffect } from 'react'

const mobile_size_pixel = 750;

const onClick = () => {
    ReactGA.event({
        category: "card_sabelo_category",
        action: "click_card_sabelo",
        label: "Card",
        value: 1,
    });
};



function CardSabelo({ nombre, desc, link, imagen, categoria, observacion }) {
    //detectar si se está en un dispositivo móvil
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    //solo se actualizará cuando se cambie el tamaño de la ventana
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= mobile_size_pixel;

    return (
        <Card>
            <CardBody>
                <div className='img-hover-zoom img-hover-zoom--xyz'>
                    <Image
                        // maxWidth='100%'
                        src={require('./../assets/' + imagen)}
                        alt={nombre}
                        fallbackSrc={require('./../assets/images/placeholder.png')}
                        fit='cover'
                        overflow='hidden'
                        cursor='pointer'        // cursor de mano cuando se pasa por encima
                        onClick={() => window.open(link, "_blank") && onClick()}
                    />

                </div>
                <Stack mt='4' spacing='1' textAlign='left'>
                    <Flex gap='2'>
                        {/* gap entre el icono de advertencia y el titulo */}
                        {
                            isMobile
                                ? <Heading size='lg' onClick={() => window.open(link, "_blank") && onClick()}>{nombre}</Heading>
                                : <Heading size='md'>{nombre}</Heading>
                        }
                        {observacion && (
                            <Tooltip label={observacion} fontSize='md' className='new-line'>
                                <button style={{ cursor: 'auto' }}>
                                    <WarningTwoIcon w={6} h={6} color="red.500" />
                                </button>
                            </Tooltip>
                        )}
                    </Flex>

                    <Text dangerouslySetInnerHTML={{ __html: desc }}>
                    </Text>


                </Stack>
            </CardBody>
        </Card>
    )
}

export default CardSabelo
