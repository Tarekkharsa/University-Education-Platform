// material
import {IconButton} from '@mui/material'
import Iconify from 'components/Iconify'
import {useClient} from 'context/auth-context'
import {useMutation, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'

// ----------------------------------------------------------------------

export default function CategoryActions({row}) {
  const navigate = useNavigate()
  let {id} = row
  const client = useClient()
  const queryClient = useQueryClient()

  const {mutate: handleRemoveClick} = useMutation(
    ({id}) =>
      client(`deleteCategory`, {method: 'POST', data: {category_id: id}}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('categories')
      },
    },
  )
  return (
    <div style={{display: 'flex'}}>
      <IconButton onClick={() => navigate(`${id}/show`)}>
        <Iconify icon="carbon:view" width={24} height={24} />
      </IconButton>
      <IconButton onClick={() => navigate(`${id}/edit`)}>
        <Iconify icon="eva:edit-fill" width={24} height={24} />
      </IconButton>
      <IconButton onClick={() => navigate(`add`, {state: row})}>
        <Iconify icon="eva:plus-fill" width={24} height={24} />
      </IconButton>
      <IconButton onClick={() => handleRemoveClick({id})}>
        <Iconify icon="ic:twotone-delete-outline" width={24} height={24} />
      </IconButton>
    </div>
  )
}
