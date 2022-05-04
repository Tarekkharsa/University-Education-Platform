import {useRecoilState} from 'recoil'
import {atomLang} from 'config'

export default () => {
  const [lang, setLang] = useRecoilState(atomLang)

  const saveLang = chosenLang => {
    window.location.reload()
    // setLang(chosenLang)
    window.localStorage.setItem('lang', chosenLang)
  }

  return {lang, saveLang}
}
