import styled from 'styled-components'

export const Layout = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-orientation: column;

    background: #F5F8FF;
`

export const Container = styled.div`
    height: 80vh;
    
    display: flex;
    flex-direction: column;

    background: #fff;
    
    margin-top: 3vh;
    margin-left: 3vw;
    margin-bottom: 3vh;
    margin-right: 3vw;
    padding: 36px 48px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    border-radius: 4px;
    text-align: center;

    p {
        margin-top: -10px;
        color: #777;
    }
`

export const BoxUpload = styled.div`
    display: grid;
    // margin-top: 20px;
    place-items: center;
    border: 1px dashed #799CD9;
    /* padding: 36px 48px; */
    position: relative;

    height: 492px;
    width: 875px;

    background: #FBFBFF;
    border-radius: 4px;

    .image-upload {
        display: flex;
        flex-wrap:wrap;

        label {
            cursor: pointer;
        
            :hover {
                opacity: .8;
            }
        }

        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;
    /* cursor: pointer; */

    #uploaded-image{
        height: 492px;
        width: 875px;
        object-fit: contain;
        border-radius: 4px;
    }

    .close-icon{
        background: #000;
        border-radius: 4px;
        opacity: .8;

        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;

        :hover {
            opacity: 1;
        }   
    }
`