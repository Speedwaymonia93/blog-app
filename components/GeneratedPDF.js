import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font
} from "@react-pdf/renderer";
// import Roboto from '../public/assets/Roboto-Regular.ttf'
// Font.register({ family: 'Roboto', src: Roboto });

const styles = StyleSheet.create({
  textBold: {
    // fontFamily: 'Roboto',
    fontWeight: 'heavy',
  },
  textUnderLine: {
    // fontFamily: 'Roboto',
    textDecoration: 'underline',
  },
  textItalic: {
    fontStyle: 'oblique',
  },
  textNormal: {
    // 
    fontStyle: 'normal'
  },
  pageSettings: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16
  },
  viewStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bulletStyle: {
    color: '#F05252',
  },
   numberStyle: {
     color: '#F05252',
  },
   listStyle: {
     display: 'flex',
     flexDirection: 'row'
  },
  listTextStyle: {
    paddingLeft: 2 ,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#F05252',
  },
  imgStyle: {
    margin: 5
   }
});

const MyDocument = ({ post }) => {
  const fileTitle = post.title;
  const image = post.featuredImage.url;
  const fileExcerpt = post.excerpt;
  const postContent = post.content.raw.children;

  return (
    <Document>
      <Page size="A4" style={styles.pageSettings} wrap>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>{fileTitle}</Text>
          <Image src={image} alt={fileTitle} style={styles.imgStyle} />
        </View>
        <View style={styles.viewStyle}>
          <Text>{fileExcerpt}</Text>
        </View>
        <View style={styles.viewStyle}>
          <DocumentRenderer paragraphComnponent={postContent} />
        </View>
        
      </Page>
    </Document>
  );
};
const DocumentRenderer = ({ paragraphComnponent }) => {

    const renderBulletList = (object) => {
      const bulletList = object.children;
      const helperArray = [];
      bulletList.map((child) => {
        child.children.map((item) => {
          item.children.map((element) => {
            helperArray.push(element)
            return helperArray
            
          })
        })
        
      })
      
      return helperArray.map((c) => <li style={styles.listStyle}>
        <Text style={styles.bulletStyle} >•</Text>
        <Text style={styles.listTextStyle}>{ c.text }</Text>
      </li>);
  };
  
  const renderNumberList = (object) => {
    const numberedList = object.children;
      const helperArray = [];
      numberedList.map((child) => {
        child.children.map((item) => {
          item.children.map((element) => {
            helperArray.push(element)
            return helperArray;
          })
        })
      })
      
    return helperArray.map((c, index) => <li style={styles.listStyle}>
      <Text style={styles.numberedList}>{ index + 1 }</Text>
      <Text style={styles.listTextStyle}>{ c.text }</Text>
    </li>);
  };
  const renderParagraph = (object) => {
    const paragraphChildren = object.children;
    return paragraphChildren.map((c) => <Text style={ c.bold ? styles.textBold : c.underline ? styles.textUnderLine : c.italic ? styles.textItalic : styles.textNormal }>
   {c.text}
      </Text>);
  };
   const renderLink = (object) => {
     const linkChildren = object.children[1]
     return (
       <Text>
         <Link href={ linkChildren.href } src={ linkChildren.href }>{ linkChildren.title }</Link>
       </Text>
     )
   };
  
   const renderBlockQuote = (object) => {
    const paragraphBlockQuote = object.children;
    
    return paragraphBlockQuote.map((c) => <Text>{c.text}</Text>);
   };
  const renderImage = (object) => {
    const imgSrc = object.src;
    const imgAlt = object.title;
    return <Image src={imgSrc} alt={imgAlt} />;
  };

  const renderTable = (object) => {
    const tableObject = object.children
 
    return ;
  };

  const helper = (itemObject) => {
    switch (itemObject.type) {
      case "paragraph":
        let paragraphLength = itemObject.children.length;
        if (paragraphLength === 3) {
          return renderLink(itemObject);
        } else {
          return renderParagraph(itemObject);
        }
      case "block-quote":
        return renderBlockQuote(itemObject);
      case "bulleted-list":
        return renderBulletList(itemObject);
      case "numbered-list":
        return renderNumberList(itemObject);
      case "image":
        return renderImage(itemObject);
      case "table":
        return renderTable(itemObject);
      default:
        return renderParagraph(itemObject);
    }
  };

  return <>{paragraphComnponent.map((item) => helper(item))}</>;
};

export default MyDocument;
