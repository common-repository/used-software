( function( blocks, editor, components, i18n ) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;

    registerBlockType( 'software-information/software-information', {
        title: i18n.__( 'Used Software', 'used-software' ),
        icon: 'admin-settings',
        category: 'common',
        attributes: {
            software: {
                type: 'array',
                default: [],
            },
            showLinks: {
                type: 'boolean',
                default: true,
            },
            showVersion: {
                type: 'boolean',
                default: true,
            },
        },

        edit: function( props ) {
            var attributes = props.attributes;

            function onChangeSoftware( index, key, value ) {
                const newSoftware = [...attributes.software];
                newSoftware[index][key] = value;
                props.setAttributes( { software: newSoftware } );
            }

            function addSoftware() {
                const newSoftware = [...attributes.software, { name: '', version: '', link: '', linkText: '' }];
                props.setAttributes( { software: newSoftware } );
            }

            function removeBlock() {
                if ( confirm( i18n.__( 'Are you sure you want to remove this block?', 'used-software' ) ) ) {
                    props.onRemove();
                }
            }

            function removeSoftware( index ) {
                const newSoftware = [...attributes.software];
                newSoftware.splice( index, 1 );
                props.setAttributes( { software: newSoftware } );
            }

            function moveBlock( direction ) {
                const { clientId } = props;
                const { moveBlockUp, moveBlockDown } = props.editor;
                
                if ( direction === 'up' ) {
                    moveBlockUp( clientId );
                } else if ( direction === 'down' ) {
                    moveBlockDown( clientId );
                }
            }

            function toggleShowLinks() {
                props.setAttributes( { showLinks: !attributes.showLinks } );
            }

            function toggleShowVersion() {
                props.setAttributes( { showVersion: !attributes.showVersion } );
            }

            return [
                el(
                    editor.BlockControls,
                    { key: 'controls' },
                    el(
                        components.Toolbar,
                        {},
                        el(
                            components.IconButton,
                            {
                                className: 'components-toolbar__control',
                                label: i18n.__( 'Remove Block', 'used-software' ),
                                onClick: removeBlock,
                                icon: 'trash',
                            }
                        ),

                    )
                ),
                el(
                    'h2',
                    { style: { textAlign: 'left', fontSize: '24px' } },
                    i18n.__( 'Software Information', 'used-software' )
                ),
                el(
                    'div',
                    { style: { width: '100%', overflowX: 'auto' } },
                    el(
                        'table',
                        { className: 'software-table', style: { width: '100%', borderCollapse: 'collapse', borderSpacing: '0' } },
                        el(
                            'thead',
                            {},
                            el(
                                'tr',
                                {},
                                el( 'th', { style: { width: '40%', textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' } }, el( 'div', { style: { fontSize: '20px' } }, i18n.__( 'Software', 'used-software' ) ) ),
                                attributes.showVersion && el( 'th', { style: { width: '40%', textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' } }, el( 'div', { style: { fontSize: '20px' } }, i18n.__( 'Version', 'used-software' ) ) ),
                                attributes.showLinks && el( 'th', { style: { width: '20%', textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' } }, el( 'div', { style: { fontSize: '20px' } }, i18n.__( 'Link', 'used-software' ) ) )
                            )
                        ),
                        el(
                            'tbody',
                            {},
                            attributes.software.map( ( software, index ) =>
                                el(
                                    'tr',
                                    { key: index },
                                    el( 'td', { style: { width: '40%', textAlign: 'left', borderBottom: '1px solid #ddd', padding: '10px' } }, software.name || i18n.__( 'Software', 'used-software' ) + ' ' + (index + 1) ),
                                    attributes.showVersion && el( 'td', { style: { width: '40%', textAlign: 'left', borderBottom: '1px solid #ddd', padding: '10px' } }, software.version ),
                                    attributes.showLinks && software.link && el( 'td', { style: { width: '20%', textAlign: 'left', borderBottom: '1px solid #ddd', padding: '10px' } }, el( 'a', { href: software.link, target: '_blank', style: { textDecoration: 'none' } }, software.linkText || i18n.__( 'Link', 'used-software' ) ) )
                                )
                            )
                        )
                    )
                ),
                el(
                    editor.InspectorControls,
                    {},
                    el(
                        components.PanelBody,
                        {
                            title: i18n.__( 'Block Settings', 'used-software' ),
                            initialOpen: true,
                        },
                        el(
                            components.ToggleControl,
                            {
                                label: i18n.__( 'Show Links', 'used-software' ),
                                checked: attributes.showLinks,
                                onChange: toggleShowLinks,
                            }
                        ),
                        el(
                            components.ToggleControl,
                            {
                                label: i18n.__( 'Show Version', 'used-software' ),
                                checked: attributes.showVersion,
                                onChange: toggleShowVersion,
                            }
                        ),
                        attributes.software.map( ( software, index ) =>
                            el(
                                components.PanelBody,
                                {
                                    title: software.name || i18n.__( 'Software', 'used-software' ) + ' ' + (index + 1),
                                    initialOpen: false,
                                },
                                el(
                                    'div',
                                    { key: index, className: 'software-item' },
                                    el(
                                        components.TextControl,
                                        {
                                            label: i18n.__( 'Software', 'used-software' ),
                                            value: software.name,
                                            onChange: function( newName ) {
                                                onChangeSoftware( index, 'name', newName );
                                            },
                                        }
                                    ),
                                    attributes.showVersion && el(
                                        components.TextControl,
                                        {
                                            label: i18n.__( 'Version', 'used-software' ),
                                            value: software.version,
                                            onChange: function( newVersion ) {
                                                onChangeSoftware( index, 'version', newVersion );
                                            },
                                        }
                                    ),
                                    attributes.showLinks && el(
                                        components.TextControl,
                                        {
                                            label: i18n.__( 'Link', 'used-software' ),
                                            value: software.link,
                                            onChange: function( newLink ) {
                                                onChangeSoftware( index, 'link', newLink );
                                            },
                                        }
                                    ),
                                    attributes.showLinks && el(
                                        components.TextControl,
                                        {
                                            label: i18n.__( 'Link Text', 'used-software' ),
                                            value: software.linkText,
                                            onChange: function( newLinkText ) {
                                                onChangeSoftware( index, 'linkText', newLinkText );
                                            },
                                        }
                                    ),
                                    el(
                                        components.Button,
                                        {
                                            isDestructive: true,
                                            onClick: function() {
                                                removeSoftware( index );
                                            },
                                        },
                                        i18n.__( 'Remove Software', 'used-software' )
                                    )
                                )
                            )
                        ),
                        el(
                            components.Button,
                            {
                                onClick: addSoftware,
                            },
                            i18n.__( 'Add Software', 'used-software' )
                        )
                    )
                ),
            ];
        },

        save: function( props ) {
            var attributes = props.attributes;

            return el(
                'div',
                {},
                el(
                    'h2',
                    { style: { textAlign: 'left', fontSize: '24px' } },
                    i18n.__( 'Software Information', 'used-software' )
                ),
                el(
                    'div',
                    { style: { width: '100%', overflowX: 'auto' } },
                    el(
                        'table',
                        { className: 'software-table', style: { width: '100%', borderCollapse: 'collapse', borderSpacing: '0' } },
                        el(
                            'thead',
                            {},
                            el(
                                'tr',
                                {},
                                el( 'th', { style: { width: '40%', textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' } }, el( 'div', { style: { fontSize: '20px' } }, i18n.__( 'Software', 'used-software' ) ) ),
                                attributes.showVersion && el( 'th', { style: { width: '40%', textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' } }, el( 'div', { style: { fontSize: '20px' } }, i18n.__( 'Version', 'used-software' ) ) ),
                                attributes.showLinks && el( 'th', { style: { width: '20%', textAlign: 'left', borderBottom: '2px solid #ddd', padding: '10px' } }, el( 'div', { style: { fontSize: '20px' } }, i18n.__( 'Link', 'used-software' ) ) )
                            )
                        ),
                        el(
                            'tbody',
                            {},
                            attributes.software.map( ( software, index ) =>
                                el(
                                    'tr',
                                    { key: index },
                                    el( 'td', { style: { width: '40%', textAlign: 'left', borderBottom: '1px solid #ddd', padding: '10px' } }, software.name || i18n.__( 'Software', 'used-software' ) + ' ' + (index + 1) ),
                                    attributes.showVersion && el( 'td', { style: { width: '40%', textAlign: 'left', borderBottom: '1px solid #ddd', padding: '10px' } }, software.version ),
                                    attributes.showLinks && software.link && el( 'td', { style: { width: '20%', textAlign: 'left', borderBottom: '1px solid #ddd', padding: '10px' } }, el( 'a', { href: software.link, target: '_blank', style: { textDecoration: 'none' } }, software.linkText || i18n.__( 'Link', 'used-software' ) ) )
                                )
                            )
                        )
                    )
                )
            );
        },
    } );

} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.components,
    window.wp.i18n
);
