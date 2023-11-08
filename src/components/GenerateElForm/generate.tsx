import { ElInput, ElSelect, ElOption,
    ElInputNumber, ElCol, ElFormItem, 
    ElRow, ElRadioGroup, ElRadio, 
    ElRadioButton, ElAutocomplete,
    ElDatePicker, ElRate, ElSlider,
    ElSwitch, ElTimePicker, ElTimeSelect } from 'element-plus'
type RowConfigBind = {
    [key: string]: any
}
type FormConfigBind = {
    [key: string]: any
}

export interface ColsItem {
    colSpan?: number
    label?: string
    htmlLabel?: string
    type: string
    specificType?: string
    bindObj?: object
    key: string
    options?: Array<any>
    rules?: Array<any>
    querySearchFun?: Function
    slots?: Array<{
        name: string
        content: any
    }>
}
export interface FormConfig {
    rowConfigBind: RowConfigBind,
    colsList: Array<ColsItem>,
    formConfigBind: FormConfigBind,
}


export interface FormData {
    [key: string]: any
}
type ItemInteriorSlotsObject = {
    [key: string]: any
}


export const renderElItem = (elItem: ColsItem, formData: FormData, context: any) => {
    // 监听 FormData 的数据变化
    formData = new Proxy(formData, {
        set (obj: any, key: string, value: any) {
            // TODO: 将更新的内容通知到业务层， 值不同的情况下
            if (value !== obj[key]) {
                context.emit('updateFormValue', key, obj[key], value)
            }
            obj[key] = value;
            return true;
        }
    });

    // 生成每个表单项的slots start
    const itemInteriorSlotsObject: ItemInteriorSlotsObject = {}
    elItem.slots?.forEach((slotItem) => {
        itemInteriorSlotsObject[slotItem.name] = () => {
            if (typeof slotItem.content === 'function') {
                // 如果是渲染函数，则需要调用
                return <>{slotItem.content()}</>
            } else if (typeof slotItem.content === 'object') {
                // 如果是一个vue组件，则需要调用render方法
                return <>{slotItem.content.render()}</>
            } else {
                // 如果是普通文字则直接渲染
                return <>{slotItem.content}</>
            }
        }
    })
    // 生成每个表单项的slots end

    switch (elItem.type) {
        case 'el-input':
            //  TODO: JSX中使用 v-bind无效，需要改为：{...elItem.bindObj}
            return (
                <ElInput
                    type={elItem.specificType}
                    {...elItem.bindObj}
                    v-model={formData[elItem.key]}
                    v-slots={itemInteriorSlotsObject}
                />
            )
        case 'el-input-number':
            return <ElInputNumber style="width: 100%;" {...elItem.bindObj} v-model={formData[elItem.key]} />
        case 'slots':
            return (
                // 插槽需要在上下文中获取
                context.slots[elItem.key]?.()
            )
        case 'el-select':
            return (
                <ElSelect {...elItem.bindObj} style="width: 100%;" v-model={formData[elItem.key]}>
                    {elItem.options?.map((opt) => (
                        <ElOption
                            key={opt.value}
                            label={opt.label}
                            value={opt.value}
                            {...opt.bindObj}
                        ></ElOption>
                    ))}
                </ElSelect>
            )
        case 'el-radio':
            return (
                <ElRadioGroup {...elItem.bindObj} style="width: 100%;" v-model={formData[elItem.key]}>
                    {elItem.options?.map((opt) => (
                        opt.isButton ? (
                            <ElRadioButton
                                key={opt.value}
                                label={opt.value}
                                {...opt.bindObj}
                            >
                                {opt.label}
                            </ElRadioButton>
                        ) : (
                            <ElRadio
                                key={opt.value}
                                label={opt.value}
                                {...opt.bindObj}
                            >
                                {opt.label}
                            </ElRadio>
                        )
                    ))}
                </ElRadioGroup>
            )
        case 'el-autocomplete':
            return (
                <ElAutocomplete
                    style="width: 100%;"
                    v-model={formData[elItem.key]}
                    fetchSuggestions={elItem.querySearchFun}
                    {...elItem.bindObj}
                />
            )
        case 'el-date-picker': 
            return (
                <div style='width: 100%'>
                    <ElDatePicker
                        style="width: 100%;"
                        type={elItem.specificType}
                        v-model={formData[elItem.key]}
                        {...elItem.bindObj}
                    />
                    <style>
                        {
                            `
                                .el-input__wrapper {
                                    width: 100%
                                }
                            `
                        }
                    </style>
                </div>
            )
        case 'el-rate': 
            return (
                <ElRate
                    v-model={formData[elItem.key]}
                    style="width: 100%;"
                    {...elItem.bindObj}
                />
            )
        case 'el-slider':
            return (
                <ElSlider
                    v-model={formData[elItem.key]}
                    style="width: 100%;"
                    {...elItem.bindObj}
                />
            )
        case 'el-switch':
            return (
                <ElSwitch
                    v-model={formData[elItem.key]}
                    style="width: 100%;"
                    {...elItem.bindObj}
                />
            )
        case 'el-time-picker':
            return (
                <ElTimePicker
                    v-model={formData[elItem.key]}
                    style="width: 100%;"
                    {...elItem.bindObj}
                />
            )
        case 'el-time-select':
            return (
                <ElTimeSelect
                    v-model={formData[elItem.key]}
                    style="width: 100%;"
                    {...elItem.bindObj}
                />
            )
    }
}

// 渲染列
export const renderColumn = (colsList: Array<ColsItem>, formData: FormData, context: any, rowConfigBind: RowConfigBind) => {
    return colsList.map((formItem) => (
        <ElCol span={formItem.colSpan || rowConfigBind.colSpan || 8}>
            {
                formItem.type === 'slots'
                ?
                renderElItem(formItem, formData, context)
                : 
                <ElFormItem prop={formItem.key} rules={formItem.rules || []} v-slots={{
                    label: () => (
                        formItem.htmlLabel 
                        ? <div v-html={formItem.htmlLabel}></div>
                        : <>{formItem.label}</>
                    ),
                }}>
                    {renderElItem(formItem, formData, context)}
                </ElFormItem>
            }
        </ElCol>
    ))
}
// 渲染行
export const renderRows = (formConfig: FormConfig, formData: FormData, context: any) => {
    return <ElRow {...formConfig.rowConfigBind}>{renderColumn(formConfig.colsList, formData, context, formConfig.rowConfigBind)}</ElRow>
}
